package com.pm.service;

import java.util.List;

import com.pm.entity.Page;
import com.pm.entity.Server_type;

public interface Server_typeService {
	public void save(Server_type u);
	public void delete(Server_type u);
	public void update(Server_type u);
	public List<Server_type> findAllServer_type();
	public Server_type findById(int id);
	public boolean Check(String server_type ,String charge_type);
	public Page queryForPage(int pageSize, int currentPage,String charge_type);
}
