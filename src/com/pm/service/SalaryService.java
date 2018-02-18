package com.pm.service;

import java.util.List;

import com.pm.entity.Page;
import com.pm.entity.Salary;

public interface SalaryService {

	public List<Salary> findAllSalary();                                       
	
	public void updateSalary(Salary s);
		
	public void deleteSalary(Salary s);
	
	public Salary findById(int id);
	
	public void save(Salary s);
	
	public boolean Check(int admin_id);
	
	public Page queryForPage(int pageSize, int currentPage,String title);
}
