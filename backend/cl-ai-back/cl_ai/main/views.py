import spacy
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Document, Query
from .serializers import DocumentSerializer, QuerySerializer
from .utils import extract_text_from_pdf, extract_text_from_docx  # Import your utility functions


nlp = spacy.load("en_core_web_sm")

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

# class QueryViewSet(viewsets.ModelViewSet):
#     queryset = Query.objects.all()
#     serializer_class = QuerySerializer

#     def create(self, request, *args, **kwargs):
#         document = Document.objects.get(id=request.data['document'])
#         question = request.data['question']

#         # Read the document text
#         file_path = document.file.path
#         if document.file.name.endswith('.pdf'):
#             with open(file_path, 'rb') as f:
#                 doc_text = extract_text_from_pdf(f)
#         elif document.file.name.endswith('.docx'):
#             doc_text = extract_text_from_docx(file_path)
#         else:
#             doc_text = document.file.read().decode('utf-8')  # We are assuming text-based files

#         # Process the text with spaCy
#         doc = nlp(doc_text)

#         # Example: Extract entities and generate a simple response
#         entities = [(ent.text, ent.label_) for ent in doc.ents]
#         answer = f"Found {len(entities)} entities: {entities}"

#         # Create the query object
#         query = Query.objects.create(document=document, question=question, answer=answer)
#         serializer = self.get_serializer(query)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

    def create(self, request, *args, **kwargs):
        document = Document.objects.get(id=request.data['document'])
        question = request.data['question']

        # Read the document text
        file_path = document.file.path
        if document.file.name.endswith('.pdf'):
            with open(file_path, 'rb') as f:
                doc_text = extract_text_from_pdf(f)
        elif document.file.name.endswith('.docx'):
            doc_text = extract_text_from_docx(file_path)
        else:
            doc_text = document.file.read().decode('utf-8')

        # Process the text with spaCy
        doc = nlp(doc_text)
        entities = [(ent.text, ent.label_) for ent in doc.ents]

        # Generate a human-like response
        response_text = self.generate_human_like_response(entities, question)
        
        # Create the query object
        query = Query.objects.create(document=document, question=question, answer=response_text)
        serializer = self.get_serializer(query)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def generate_human_like_response(self, entities, question):
        # Basic example of generating a response
        response = f"Based on the information from the document, here are some insights: \n\n"

        if "Pi" in question:  # Example condition
            response += "The character Pi appears multiple times, reflecting his significance throughout the narrative. Pi's experiences intertwine with various cultural motifs, highlighting themes of faith and doubt.\n\n"
        
        # Add more logic based on entities and the question
        # Example: Group by entity types
        organizations = [ent for ent in entities if ent[1] == 'ORG']
        if organizations:
            response += "Organizations mentioned include: " + ", ".join([org[0] for org in organizations]) + ".\n"

        # Summarize findings based on other entities
        # This part can be expanded to create more comprehensive responses

        return response
