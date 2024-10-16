Navigate to the Backend Directory:

bash
Copy code
cd cl-ai/backend
Create a Virtual Environment (optional but recommended):

bash
Copy code
python -m venv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`
Install Required Packages:

bash
Copy code
pip install -r requirements.txt
Set Up the Database (if using PostgreSQL):

Create a database and update the settings in settings.py accordingly.
Run the migrations:
bash
Copy code
python manage.py migrate
Run the Development Server:

bash
Copy code
python manage.py runserver
Access the API: The backend will be available at http://127.0.0.1:8000/api/

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
