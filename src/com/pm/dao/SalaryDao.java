package com.pm.dao;

import java.util.List;

import com.pm.entity.Salary;

public interface  SalaryDao {
	
	public List<Salary> findAllSalary();
	
	public void updateSalary(Salary s);
		
	public void deleteSalary(Salary s);
	
	public Salary findById(int id);
	
	public void save(Salary s);
	
	public boolean Check(int admin_id);
	
	/*分页查询*/
	public List<Salary> queryForPage(String hql,int offset,int length);
	     
	/*总记录条数*/
	public int getCount(String hql);
}
