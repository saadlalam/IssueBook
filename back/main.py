from flask import Flask
from flask_cors import CORS
from app.config import properties
from app.api.issues import issues

app = Flask(__name__)
app.register_blueprint(issues, url_prefix=f'/api/issues')
CORS(app, resources={r"/*": {"origins": properties.AUTHORIZED_ORIGIN}}, supports_credentials=True)







if __name__ == '__main__':
    app.run(debug=properties.DEBUG)