import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Mahasiswa

@view_config(route_name='mahasiswa_list', renderer='json')
def mahasiswa_list(request):
    dbsession = request.dbsession
    mahasiswas = dbsession.query(Mahasiswa).all()
    return {'mahasiswas': [m.to_dict() for m in mahasiswas]}

@view_config(route_name='mahasiswa_detail', renderer='json')
def mahasiswa_detail(request):
    dbsession = request.dbsession
    m_id = request.matchdict['id']
    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=m_id).first()
    if mahasiswa is None:
        return HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})
    return {'mahasiswa': mahasiswa.to_dict()}

@view_config(route_name='mahasiswa_add', request_method='POST', renderer='json')
def mahasiswa_add(request):
    try:
        json_data = request.json_body
        required = ['nim', 'nama', 'jurusan']
        for field in required:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib'})
        
        tgl = None
        if 'tanggal_lahir' in json_data and json_data['tanggal_lahir']:
            try:
                tgl = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'Format tanggal salah'})

        m = Mahasiswa(
            nim=json_data['nim'],
            nama=json_data['nama'],
            jurusan=json_data['jurusan'],
            tanggal_lahir=tgl,
            alamat=json_data.get('alamat')
        )
        request.dbsession.add(m)
        request.dbsession.flush()
        return {'success': True, 'mahasiswa': m.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

@view_config(route_name='mahasiswa_update', request_method='PUT', renderer='json')
def mahasiswa_update(request):
    dbsession = request.dbsession
    m_id = request.matchdict['id']
    m = dbsession.query(Mahasiswa).filter_by(id=m_id).first()
    if not m:
        return HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})
    
    try:
        data = request.json_body
        if 'nim' in data: m.nim = data['nim']
        if 'nama' in data: m.nama = data['nama']
        if 'jurusan' in data: m.jurusan = data['jurusan']
        if 'alamat' in data: m.alamat = data['alamat']
        
        return {'success': True, 'mahasiswa': m.to_dict()}
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})

@view_config(route_name='mahasiswa_delete', request_method='DELETE', renderer='json')
def mahasiswa_delete(request):
    dbsession = request.dbsession
    m_id = request.matchdict['id']
    m = dbsession.query(Mahasiswa).filter_by(id=m_id).first()
    if not m:
        return HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})
    dbsession.delete(m)
    return {'success': True, 'message': 'Data dihapus'}