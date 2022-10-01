import sqlite3
import os
import algo


conn = sqlite3.connect('documents.db')
cur  = conn.cursor()

print('Created cursor...')

for id, file in enumerate(os.listdir('BigFolderFiles')):
    doc = algo.Document(os.path.join('BigFolderFiles', file), id)
    
    # new_document = Document(summary=doc.summarize(0.2), starting_text=doc.text[:256])
    # db.session.add(new_document)
    # db.session.commit()
    
    cur.execute("INSERT INTO document (id, summary, starting_text, filename) VALUES (?, ?, ?, ?)", (id, doc.summarize(), doc.text[:100] + '...', file))
    conn.commit()
    
    print('Added document', id)


