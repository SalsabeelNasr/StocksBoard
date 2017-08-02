package stockapi.Stocks;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController; 

import java.util.ArrayList; 
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import javax.swing.text.View;
@RestController
public class StocksController {
	private Random rand  = new Random(); 
	
	@RequestMapping(value = "/Stocks", method = RequestMethod.GET, produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ArrayList<Stock> Stocks() { 
	ArrayList<Stock> stocks = new ArrayList<Stock>();
	stocks.add(	new Stock("hp",ThreadLocalRandom.current().nextDouble(1, 1000)));
	stocks.add(new Stock("Dell",ThreadLocalRandom.current().nextDouble(1, 1000)));
	stocks.add(new Stock("Microsoft",ThreadLocalRandom.current().nextDouble(1, 1000)));
	stocks.add(new Stock("Asus",ThreadLocalRandom.current().nextDouble(1, 1000)));
	stocks.add(new Stock("Canon",ThreadLocalRandom.current().nextDouble(1, 1000)));
	return stocks;
}
 
}
