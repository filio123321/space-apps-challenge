from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LAParams, LTFigure, LTTextBox
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFPageInterpreter, PDFResourceManager
from pdfminer.pdfpage import PDFPage, PDFTextExtractionNotAllowed
from pdfminer.pdfparser import PDFParser
import numpy as np
import pdf2image
import cv2


"""# faster but bad results
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest"""

# sloder but much better
from transformers import pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


def ratio(s, t):
    """ levenshtein_ratio_and_distance:
        Calculates levenshtein distance between two strings.
        If ratio_calc = True, the function computes the
        levenshtein distance ratio of similarity between two strings
        For all i and j, distance[i,j] will contain the Levenshtein
        distance between the first i characters of s and the
        first j characters of t
    """
    # Initialize matrix of zeros
    rows = len(s)+1
    cols = len(t)+1
    distance = np.zeros((rows,cols),dtype = int)

    # Populate matrix of zeros with the indeces of each character of both strings
    for i in range(1, rows):
        for k in range(1,cols):
            distance[i][0] = i
            distance[0][k] = k

    # Iterate over the matrix to compute the cost of deletions,insertions and/or substitutions    
    for col in range(1, cols):
        for row in range(1, rows):
            if s[row-1] == t[col-1]:
                cost = 0 # If the characters are the same in the two strings in a given position [i,j] then the cost is 0
            else:
                cost = 2
            distance[row][col] = min(distance[row-1][col] + 1,      # Cost of deletions
                                 distance[row][col-1] + 1,          # Cost of insertions
                                 distance[row-1][col-1] + cost)     # Cost of substitutions

    # Computation of the Levenshtein Distance Ratio
    Ratio = ((len(s)+len(t)) - distance[row][col]) / (len(s)+len(t))
    return Ratio


class Document:
    def __init__(self, path, id):
        self.text = ""

        with open(path, 'rb') as f:
            parser = PDFParser(f)
            doc = PDFDocument(parser)
            for page in list(PDFPage.create_pages(doc)):
                rsrcmgr = PDFResourceManager()
                device = PDFPageAggregator(rsrcmgr, laparams=LAParams())
                interpreter = PDFPageInterpreter(rsrcmgr, device)
                interpreter.process_page(page)
                layout = device.get_result()
                
                for obj in layout:
                    if isinstance(obj, LTTextBox):
                        self.text += obj.get_text()
        self.text = self.text.replace('\nN/A', ' ').replace('\n', ' ')
        
        images = pdf2image.convert_from_path(fr'{path}', dpi=300, poppler_path=r"poppler-0.68.0\bin")
        images[0].save(f'./photo/front/{id}.jpg')
        images[-1].save(f'./photo/back/{id}.jpg')
        
        # crop image by half
        img = cv2.imread(f'./photo/front/{id}.jpg')
        img = img[:img.shape[1]//2, :]
        cv2.imwrite(f'./photo/front/{id}.jpg', img)
        img = cv2.imread(f'./photo/back/{id}.jpg')
        img = img[:img.shape[0]//2, :]
        cv2.imwrite(f'./photo/back/{id}.jpg', img)
        

    def summarize(self, per=0.1):
        # slower but much better

        return summarizer(self.text[:4096], max_length=450, min_length=400, do_sample=False)[0]['summary_text']
        
    
    """def summarize(self, per=0.1):
        # faster but bad result with lots of errors

        nlp = spacy.load('en_core_web_sm')
        doc= nlp(self.text)
        tokens=[token.text for token in doc]
        word_frequencies={}
        for word in doc:
            if word.text.lower() not in list(STOP_WORDS):
                if word.text.lower() not in punctuation:
                    if word.text not in word_frequencies.keys():
                        word_frequencies[word.text] = 1
                    else:
                        word_frequencies[word.text] += 1
        max_frequency=max(word_frequencies.values())
        for word in word_frequencies.keys():
            word_frequencies[word]=word_frequencies[word]/max_frequency
        sentence_tokens= [sent for sent in doc.sents]
        sentence_scores = {}
        for sent in sentence_tokens:
            for word in sent:
                if word.text.lower() in word_frequencies.keys():
                    if sent not in sentence_scores.keys():                            
                        sentence_scores[sent]=word_frequencies[word.text.lower()]
                    else:
                        sentence_scores[sent]+=word_frequencies[word.text.lower()]
        select_length=int(len(sentence_tokens)*per)
        summary=nlargest(select_length, sentence_scores,key=sentence_scores.get)
        final_summary=[word.text for word in summary]
        summary=''.join(final_summary)
        return summary"""
