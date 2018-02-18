package com.pm.dao;

import java.util.List;

import com.pm.entity.AdminAccess;

public interface AdminAccessDao {
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
	
	/*分页查询*/
	public List<AdminAccess> queryForPage(String hql,int offset,int length);
	     
	/*总记录条数*/
	public int getCount(String hql);
}
