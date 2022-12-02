package com.aufgabe.monitoringurl;

import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MonitoringURLController {

    @GetMapping("/monitoring-url/check")
    public int getStatus(@RequestParam(value = "monitorUrl", defaultValue = "") String monitorUrl) {
        int result = 0;
        try {
            System.out.println(monitorUrl);
            URL siteURL = new URL(monitorUrl);
            HttpURLConnection connection = (HttpURLConnection) siteURL.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            result = connection.getResponseCode();
        } catch (Exception e) {
            result = -1;
        }
        return result;
    }
}
