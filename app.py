import os
from flask import Flask, session, render_template, request, redirect, flash, url_for
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from helpers import apology, login_required
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)

# verify environment variable
if not os.getenv("DATABASE_URL"):
  raise RuntimeError("DATABASE URL IS NOT SET")

# configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
@login_required
def index():
  """Home Page"""
  return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
  """Register User"""
  session.clear()
  #Get the user's selected username / password / confirmation
  username = request.form.get("username")
  password = request.form.get("password")
  confirmation = request.form.get("confirmation")

  if request.method == "POST":

    # check if the user entered a username before submitting
    if not request.form.get("username"):
      return apology("Please enter a username")

    #check the database if username already exists
    verifyUsername = db.execute("SELECT * FROM users WHERE username = :username", {"username":username}).fetchone()

    if verifyUsername:
      return apology("That username is already taken")
    
    #check if the password was inputted
    elif not password:
      return apology("Please enter a password")
    
    #check if password and confirmation match
    elif not password == confirmation:
      return apology("Password must match, try again")

    #insert new user into database
    db.execute("INSERT INTO users (username, password) VALUES (:username, :password)", {"username": username, "password": generate_password_hash(password)})
    db.commit()

    flash("You were successfully registered!", "info")

    return redirect("/login")

  else:
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
  """Log In User"""
  session.clear()
  username = request.form.get("username")
  password = request.form.get("password")

  if request.method == "POST":
    #verify user input for username and password
    if not username:
      return apology("Please enter a your username")
    elif not password:
      return apology("Please enter your password")
    
    #get user info from database
    rows = db.execute("SELECT * FROM users WHERE username = :username", {"username": username})
    data = rows.fetchone()

    #verify password and username
    if data == None or not check_password_hash(data[2], password):
      return apology("Invalid username or password")
    if username != data[1]:
      return apology("Username does not match")

    session["user_id"] = data[0]
    session["user_name"] = data[1]

    return redirect("/")
  else:
    return render_template("login.html")

@app.route("/logout")
def logout():
  session.clear()
  return render_template("login.html")

@app.route("/timetracker")
@login_required
def timetracker():
  return render_template("timetracker.html")


@app.route("/todo", methods=["GET", "POST"])
@login_required
def todo():
  todoItem = request.form.get("todo-item")
  if request.method == "POST":
    if not todoItem:
      return apology("please enter a valid item")

    db.execute("INSERT INTO todolist (todoitem) VALUES (:todoItem)", {"todoItem":todoItem})
    db.commit()

    items = db.execute("SELECT todoitem FROM todolist")
  
    return render_template("todo.html", items=items)

  else:
    items = db.execute("SELECT todoitem FROM todolist")

    return render_template("todo.html", items=items)

if __name__ == '__main__':
   app.run(debug = True)