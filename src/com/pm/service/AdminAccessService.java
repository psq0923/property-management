package com.pm.service;

import java.util.List;

import com.pm.entity.AdminAccess;
import com.pm.entity.Page;

public interface AdminAccessService {
	/*查询权限*/
	public List<AdminAccess> findAllAccess(); 
	
	/*增加权限*/
	public void saveAccess(AdminAccess aac);
	
	/*删除权限*/
	public void deleteAccess(AdminAccess aac);
	
	/*修改权限*/
	public void updateAccess(AdminAccess aac);
	
	/*查询某个权限*/
	public AdminAccess findById(int id);
	
	public Page queryForPage(int pageSize, int currentPage);
	
}
