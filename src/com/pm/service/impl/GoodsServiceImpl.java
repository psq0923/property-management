package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.GoodsDao;
import com.pm.entity.Goods;
import com.pm.entity.Page;
import com.pm.entity.Server_type;
import com.pm.service.GoodsService;

public class GoodsServiceImpl implements GoodsService {

	private GoodsDao goodsDao;
	
	public GoodsDao getGoodsDao() {
		return goodsDao;
	}

	public void setGoodsDao(GoodsDao goodsDao) {
		this.goodsDao = goodsDao;
	}

	@Override
	public void saveGoods(Goods g) {
		goodsDao.saveGoods(g);

	}

	@Override
	public void deleteGoods(Goods g) {
		goodsDao.deleteGoods(g);

	}

	@Override
	public void updateGoods(Goods g) {
		goodsDao.updateGoods(g);

	}

	@Override
	public Goods findByIdGoods(int id) {
		
		return goodsDao.findByIdGoods(id);
	}

	@Override
	public List<Goods> findAllGoods() {
		
		return goodsDao.findAllGoods();
	}

	@Override
	public List<Goods> findAllGoods2() {
		return goodsDao.findAllGoods2();
	}
	
}
