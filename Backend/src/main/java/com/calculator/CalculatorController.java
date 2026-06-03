package com.calculator;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.HashMap;
import java.util.Map;
 
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")   // allows your frontend (any origin) to call this API
public class CalculatorController {
 
    @Autowired
    private CalculatorService calculatorService;
 
    /**
     * POST /api/calculate
     *
     * Request body (JSON):
     * {
     *   "num1": 10,
     *   "num2": 5,
     *   "operator": "+"
     * }
     *
     * Response (JSON):
     * { "result": 15.0 }
     *
     * Error response:
     * { "error": "Division by zero is not allowed." }
     */
    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculate(@RequestBody CalculateRequest request) {
        Map<String, Object> response = new HashMap<>();
 
        try {
            double result = calculatorService.calculate(
                request.getNum1(),
                request.getNum2(),
                request.getOperator()
            );
            response.put("result", result);
            return ResponseEntity.ok(response);
 
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}