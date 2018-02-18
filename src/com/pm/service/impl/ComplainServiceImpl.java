package com.pm.service.impl;

import com.pm.dao.ComplainDao;

import com.pm.entity.Complain;

import com.pm.service.ComplainService;

public class ComplainServiceImpl implements ComplainService {
	private ComplainDao complainDao;

	public ComplainDao getComplainDao() {
		return complainDao;
	}

	public void setComplainDao(ComplainDao complainDao) {
		this.complainDao = complainDao;
	}

	@Override
	public void save(Complain complain) {
		complainDao.save(complain);
	}

	/*@Override
	public Complain findById(int user_id) {
		Complain complain = complainDao.findById(user_id);
		return complain;
	}*/
}
