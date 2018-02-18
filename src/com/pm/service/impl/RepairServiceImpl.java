package com.pm.service.impl;


import java.util.List;

import com.pm.dao.RepairDao;
import com.pm.entity.Repair;
import com.pm.service.RepairService;


public class RepairServiceImpl implements RepairService {
	private RepairDao repairDao;

	public RepairDao getRepairDao() {
		return repairDao;
	}

	public void setRepairDao(RepairDao repairDao) {
		this.repairDao = repairDao;
	}

	@Override
	public void save(Repair repair) {
		repairDao.save(repair);
	}
	@Override
	public void delete(Repair r) {
		repairDao.delete(r);
		
	}

	@Override
	public void update(Repair r) {
		repairDao.update(r);
		
	}

	
	@Override
	public Repair findById(int id) {
		Repair repair = repairDao.findById(id);
		return repair;
	}

	@Override
	public List<Repair> findAllRepairs() {
		System.out.println("-----service");
		List<Repair> repairs = repairDao.findAllRepairs();
		return repairs;
	}
    
	

}
