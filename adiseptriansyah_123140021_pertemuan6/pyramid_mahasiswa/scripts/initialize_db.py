import argparse
import sys
from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError
from .. import models

def setup_models(dbsession):
    """
    Add initial model objects.
    """
    # Tambah data dummy Matakuliah
    mk1 = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF101').first()
    if not mk1:
        model = models.Matakuliah(kode_mk='IF101', nama_mk='Algoritma', sks=3, semester=1)
        dbsession.add(model)
        print("Matakuliah IF101 added.")

def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])

def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)
    request = env['request']
    try:
        with request.tm:
            dbsession = request.dbsession
            setup_models(dbsession)
    except OperationalError:
        print('Error connecting to database')
    finally:
        env['closer']()

if __name__ == '__main__':
    main()