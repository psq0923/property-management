package com.pm.dao;

import java.util.List;

import com.pm.entity.Server_type;

public interface Server_typeDao {
	public void save(Server_type u);
	public void delete(Server_type u);
	public void update(Server_type u);
	public List<Server_type> findAllServer_type();
	public Server_type findById(int id);
	public boolean Check(String server_type ,String charge_type);
	/*分页查询*/
	public List<Server_type> queryForPage(String hql,int offset,int length);
	     
	/*总记录条数*/
	public int getCount(String hql);
}
