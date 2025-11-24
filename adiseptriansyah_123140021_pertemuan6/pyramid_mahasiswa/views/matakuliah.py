from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from sqlalchemy.exc import IntegrityError
from ..models import Matakuliah

# 1. GET ALL
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}

# 2. GET ONE
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
    
    return {'matakuliah': matakuliah.to_dict()}

# 3. CREATE (POST)
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    try:
        json_data = request.json_body
        
        # Validasi field wajib
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})

        mk = Matakuliah(
            kode_mk=json_data['kode_mk'],
            nama_mk=json_data['nama_mk'],
            sks=int(json_data['sks']),
            semester=int(json_data['semester'])
        )
        
        dbsession = request.dbsession
        dbsession.add(mk)
        dbsession.flush() 
        return {'success': True, 'matakuliah': mk.to_dict()}
        
    except IntegrityError:
        dbsession.rollback()
        return HTTPBadRequest(json_body={'error': 'Kode Matakuliah sudah ada'})
    except ValueError:
         return HTTPBadRequest(json_body={'error': 'SKS dan Semester harus berupa angka'})
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

# 4. UPDATE (PUT)
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})

    try:
        json_data = request.json_body
        
        if 'kode_mk' in json_data: matakuliah.kode_mk = json_data['kode_mk']
        if 'nama_mk' in json_data: matakuliah.nama_mk = json_data['nama_mk']
        if 'sks' in json_data: matakuliah.sks = int(json_data['sks'])
        if 'semester' in json_data: matakuliah.semester = int(json_data['semester'])
        
        dbsession.flush()
        return {'success': True, 'matakuliah': matakuliah.to_dict()}
        
    except IntegrityError:
        dbsession.rollback()
        return HTTPBadRequest(json_body={'error': 'Kode Matakuliah konflik dengan data lain'})
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

# 5. DELETE
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if matakuliah is None:
        return HTTPNotFound(json_body={'error': 'Matakuliah tidak ditemukan'})
        
    dbsession.delete(matakuliah)
    return {'success': True, 'message': f'Matakuliah ID {mk_id} berhasil dihapus'}