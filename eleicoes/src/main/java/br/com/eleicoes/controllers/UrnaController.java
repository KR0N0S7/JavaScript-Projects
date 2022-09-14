package br.com.eleicoes.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UrnaController {

	@RequestMapping
	public ModelAndView index() {
		ModelAndView mv = new ModelAndView("index.html");
		
		return mv;
	}
}
