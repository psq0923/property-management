package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.SalaryDao;
import com.pm.entity.News;
import com.pm.entity.Page;
import com.pm.entity.Salary;
import com.pm.service.SalaryService;

public class SalaryServiceImpl implements SalaryService {
	private SalaryDao salaryDao;

	public SalaryDao getSalaryDao() {
		return salaryDao;
	}

	public void setSalaryDao(SalaryDao salaryDao) {
		this.salaryDao = salaryDao;
	}

	@Override
	public List<Salary> findAllSalary() {
		List<Salary> salarys = salaryDao.findAllSalary();
		return salarys;
	}

	@Override
	public void updateSalary(Salary s) {
		salaryDao.updateSalary(s);
	}

	@Override
	public void deleteSalary(Salary s) {
		salaryDao.deleteSalary(s);
	}
	
	@Override
	public Salary findById(int id) {
		Salary salary = salaryDao.findById(id);
		return salary;
	}
	@Override
	public void save(Salary s) {
		salaryDao.save(s);
	}
	
	@Override
	public boolean Check(int admin_id) {
		return salaryDao.Check(admin_id);
	}
	
	@Override
	public Page queryForPage(int pageSize, int page,String title) {
		String hql = "";
		if(title.equals("") || title==null){
			hql = "select count(*) from Salary";
		}else{
			hql = "select count(*) from Salary where like '%"+title+"%'";
		}
		
		int count = salaryDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<Salary> list;
		if(title.equals("") || title==null){
			list = salaryDao.queryForPage("from Salary", offset, length); // 该分页的记录
		}else{
			list = salaryDao.queryForPage("from Salary where title like '%"+title+"%'", offset, length); // 该分页的记录
		}
		
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("salary_list", list);
		}else{
			session.removeAttribute("salary_list");
		}
		// 把分页信息保存到Bean中
		Page pageBean = new Page();
		pageBean.setPageSize(pageSize);
		pageBean.setCurrentPage(currentPage);
		pageBean.setAllRow(count);
		pageBean.setTotalPage(totalPage);
		pageBean.setList(list);
		pageBean.init();
		return pageBean;
	}
}
