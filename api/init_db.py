from sqlalchemy import inspect

import db.models as models
from db.database import Base, engine, SessionLocal


insp = inspect(engine)
if not insp.has_table('users') and not insp.has_table('cars'):
    Base.metadata.create_all(engine)

    with SessionLocal() as db_session:

        # Create a user admin
        # usuario 'admin'
        # senha 'admin'
        admi_user = models.User(username='admin', email='admin@admin.com', is_admin=True, password='$2b$12$TMT5C13D10.PtkNDYIEuyu.DWJLf7XVyPMlnSlpj8bX6h5uZBI7hW')
        db_session.add(admi_user)
        db_session.commit()

        # Gera a lista de carros inicial
        car1 = models.Car(name='Civic', mark='Honda', model='Sedan', year=2017, info='ONE EXL', value=97599.00, color='Preto')
        car2 = models.Car(name='Ka', mark='Ford', model='Hatchback', year=2020, info='TI-VCT SE', value=52399.00, color='Vermelho')
        car3 = models.Car(name='Kwid', mark='Renauld', model='Hatchback', year=2017, info='SCE INTENSE', value=48099.00, color='Preto')
        car4 = models.Car(name='Renegade', mark='Jeep', model='Suv', year=2020, info='STD', value=77399.00, color='Preto')
        car5 = models.Car(name='Tucson', mark='Hyundai', model='Suv', year=2022, info='GLS ECOSHIFT', value=134699.00, color='Branco')

        db_session.add_all([car1, car2, car3, car4, car5])
        db_session.commit()
