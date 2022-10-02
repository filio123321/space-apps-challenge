from flask import Flask, render_template, request, redirect, url_for, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
import algo


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///documents.db'
app.config['SECRET_KEY'] = 'super-secret-key-123456'
# app.config['DEBUG'] = True

db = SQLAlchemy(app)

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    summary = db.Column(db.String(1024), unique=False, nullable=False)
    starting_text = db.Column(db.String(256), unique=False, nullable=False)
    filename = db.Column(db.String(256), unique=False, nullable=False)
    

@app.route('/', methods=['GET'])
def index():
    search_sentence = request.args.get('search')
    if search_sentence:
        reuslt_by_ratio = []
        end_jsson = []
        
        for doc in db.session.query(Document).all():
            reuslt_by_ratio.append((algo.ratio(doc.summary, search_sentence), doc,))
        
        for item in sorted(reuslt_by_ratio, key=lambda x: x[0], reverse=True):
            end_jsson.append({'summary': item[1].summary, 'starting_text': item[1].starting_text,
                              'id': item[1].id, 'ratio': str(item[0])[:6], 'link': f'http://192.168.1.10:5000/docs/{item[1].id}',
                              'front': f'http://192.168.1.10:5000/photo/{item[1].id}/front',
                              'back': f'http://192.168.1.10:5000/photo/{item[1].id}/back', 
                              'badFront': f'http://192.168.1.10:5000/photo/bad/{item[1].id}/front',
                             'badBack': f'http://192.168.1.10:5000/photo/bad/{item[1].id}/back'}) # ! change link ip and port
            
        return jsonify(end_jsson)
    else:
        return jsonify([{'error': 'No search query'}])
    
@app.route('/photo/<id>/front', methods=['GET'])
def front_photo(id):
    # return photo file
    return send_file(fr'./photo/front/{id}.jpg', mimetype='image/gif')

@app.route('/photo/<id>/back', methods=['GET'])
def back_photo(id):
    # return photo file
    return send_file(fr'./photo/back/{id}.jpg', mimetype='image/gif')


@app.route('/photo/bad/<id>/front', methods=['GET'])
def bad_front_photo(id):
    # return photo file
    return send_file(fr'./photo/bad/front/{id}.jpg', mimetype='image/gif')

@app.route('/photo/bad/<id>/back', methods=['GET'])
def bad_back_photo(id):
    # return photo file
    return send_file(fr'./photo/bad/back/{id}.jpg', mimetype='image/gif')


@app.route('/docs/<id>', methods=['GET'])
def get_doc(id=None):
    if id:
        filename = db.session.query(Document).filter_by(id=id).first().filename
        # send pdf
        return send_file(fr'./BigFolderFiles/{filename}', mimetype='application/pdf')

if __name__ == '__main__':
    app.debug = True
    app.run(debug=True, host="0.0.0.0") #go to http://localhost:5000/ to view the page.
    