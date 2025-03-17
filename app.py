from flask import Flask, request, jsonify
import script  # Import script function

app = Flask(__name__)

@app.route('/request', methods=['GET'])
def request_price():
    commodity = request.args.get('commodity')
    state = request.args.get('state')
    market = request.args.get('market')

    if not commodity or not state or not market:
        return jsonify({"error": "Missing query parameters"}), 400

    result = script.script(state, commodity, market)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001, debug=True)

