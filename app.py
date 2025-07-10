from flask import Flask, render_template, request, jsonify
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_time', methods=['POST'])
def save_time():
    if request.method == 'POST':
        saved_time = request.json['time']
        with open('saved_data.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([saved_time])
        return jsonify({"status": "success"})

@app.route('/get_saved_times', methods=['GET'])
def get_saved_times():
    saved_times = []
    try:
        with open('saved_data.csv', mode='r') as file:
            reader = csv.reader(file)
            saved_times = [row[0] for row in reader if row]
    except FileNotFoundError:
        pass
    return jsonify({"times": saved_times})

if __name__ == '__main__':
    app.run(port=5000)
