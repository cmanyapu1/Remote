from flask import Flask, request, render_template, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


debug = DebugToolbarExtension(app)

RESPONSES_KEY = "responses"

@app.route("/")
def show_start_survey():
    
    return render_template("start_survey.html", survey=survey)


@app.route("/begin", methods = ["POST"])
def start_survey():
   
    session[RESPONSES_KEY] = []

    return redirect("/questions/0")

@app.route("/questions/<int:qid>")
def show_questions(qid):

    responses = session.get(RESPONSES_KEY)

    if(responses is None):
        return redirect("/")
    
    if(len(responses) == len(survey.questions)):
        return redirect("/complete")

    if(len(responses) != qid):
        flash(f"Invalid question id {qid}.")
        return redirect(f"/questions/{len(responses)}")
    
    question = survey.questions[qid]
    return render_template("question.html", question_num=qid, question=question)

@app.route("/answers", methods = ["POST"])
def submit_answers():

    choice = request.form["answer"]
    
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(RESPONSES_KEY) == len(survey.questions)):
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")

@app.route("/complete")
def complete_page():

    return render_template("complete.html")
