from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

from .meta import Base

try:
    from .mahasiswa import Mahasiswa
except ImportError:
    pass

try:
    from .matakuliah import Matakuliah
except ImportError:
    pass

configure_mappers()

def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)

def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory

def get_tm_session(session_factory, transaction_manager):
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession

def includeme(config):
    """
    Fungsi konfigurasi untuk menghubungkan database ke Pyramid
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'
    config.include('pyramid_tm')

    dbsession_factory = config.registry['dbsession_factory'] = get_session_factory(
        get_engine(settings)
    )

    config.add_request_method(
        lambda r: get_tm_session(dbsession_factory, r.tm),
        'dbsession',
        reify=True
    )