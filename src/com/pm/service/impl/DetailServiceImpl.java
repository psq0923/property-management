package com.pm.service.impl;

import java.util.List;

import com.pm.dao.DetailDao;
import com.pm.entity.Detail;

import com.pm.service.DetailService;

public class DetailServiceImpl implements DetailService{
	 private  DetailDao detailDao;
	    
		
	public DetailDao getDetailDao() {
		return detailDao;
	}

	public void setDetailDao(DetailDao detailDao) {
		this.detailDao = detailDao;
	}

	@Override
	public void save(Detail d) {
		detailDao.save(d);
		
	}

	@Override
	public void delete(Detail d) {
		detailDao.delete(d);
		
	}

	@Override
	public void update(Detail d) {
		detailDao.update(d);
		
	}

	@Override
	public List<Detail>findAllDetails() {
		List<Detail> details = detailDao.findAllDetails();
		return details;
	}

	@Override
	public Detail findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
