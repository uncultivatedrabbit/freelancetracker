import os
from flask import Flask, session, render_template, request, redirect, flash, url_for
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
# from helpers import apology, login_required
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

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/register")
def register():
  return render_template("register.html")

@app.route("/login")
def login():
  return render_template("login.html")