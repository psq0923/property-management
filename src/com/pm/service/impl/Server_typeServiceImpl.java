package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.Server_typeDao;
import com.pm.dao.impl.Server_typeDaoImpl;
import com.pm.entity.News;
import com.pm.entity.Page;
import com.pm.entity.Server_type;
import com.pm.service.Server_typeService;

public class Server_typeServiceImpl implements Server_typeService {

	private Server_typeDao server_typeDao;

	
	public Server_typeDao getServer_typeDao() {
		return server_typeDao;
	}

	public void setServer_typeDao(Server_typeDao server_typeDao) {
		this.server_typeDao = server_typeDao;
	}

	
	@Override
	public void save(Server_type u) {
		server_typeDao.save(u);
		
	}
	@Override
	public void delete(Server_type u) {
		server_typeDao.delete(u);

	}

	@Override
	public void update(Server_type u) {
		server_typeDao.update(u);

	}

	@Override
	public List<Server_type> findAllServer_type() {
		List<Server_type> server_types = server_typeDao.findAllServer_type();
		return server_types;
	}

	@Override
	public Server_type findById(int id) {
		Server_type type = server_typeDao.findById(id);
		return type;
	}

	/*
	 * @Override public Server_type Check(Server_type server_type) { Server_type
	 * server=userDao.Check(server_type); return server; }
	 */
	@Override
	public boolean Check(String server_type, String charge_type) {
	
		return server_typeDao.Check(server_type, charge_type);
	}
	
	@Override
	public Page queryForPage(int pageSize, int page,String charge_type) {
		String hql = "";
		if(charge_type.equals("") || charge_type==null){
			hql = "select count(*) from Server_type ";
		}else{
			hql = "select count(*) from Server_type where charge_type like '%"+charge_type+"%'";
		}
		
		int count = server_typeDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<Server_type> list;
		if(charge_type.equals("") || charge_type==null){
			list = server_typeDao.queryForPage("from Server_type", offset, length); // 该分页的记录
		}else{
			list = server_typeDao.queryForPage("from Server_type where charge_type like '%"+charge_type+"%'", offset, length); // 该分页的记录
		}
		
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("server_type_list", list);
		}else{
			session.removeAttribute("server_type_list");
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
