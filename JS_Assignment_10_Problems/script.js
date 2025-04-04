// Function Definitions

// 1. ATM Withdrawal System
function atmWithdrawal(balance, amount, pin, enteredPin) {
    if (enteredPin !== pin) {
      return "Incorrect PIN";
    }
    if (amount > balance) {
      return "Insufficient Funds";
    }
    if (amount % 100 !== 0) {
      return "Enter amount in multiples of 100";
    }
    balance -= amount;
    return `Withdrawal successful. Remaining balance: ${balance}`;
  }
  
  // 2. Online Shopping Discount & Free Shipping
  function calculateFinalAmount(orderAmount) {
    let discount = 0;
    if (orderAmount > 1000) {
      discount = 0.20;
    } else if (orderAmount >= 500) {
      discount = 0.10;
    }
    const discountedAmount = orderAmount - orderAmount * discount;
    const shipping = discountedAmount > 50 ? 0 : 10;
    return discountedAmount + shipping;
  }
  
  // 3. Student Grading System with Extra Credit
  function calculateGrade(marks, attendance) {
    if (attendance > 90) {
      marks += 5;
    }
    if (marks >= 90) {
      return "A";
    } else if (marks >= 80) {
      return "B";
    } else if (marks >= 70) {
      return "C";
    } else if (marks >= 60) {
      return "D";
    } else {
      return "F";
    }
  }
  
  // 4. Smart Traffic Light System
  function trafficLightControl(density) {
    if (density === "Heavy Traffic") {
      return 60;
    } else if (density === "Moderate Traffic") {
      return 40;
    } else if (density === "Light Traffic") {
      return 20;
    } else {
      return "Invalid traffic density";
    }
  }
  
  // 5. Movie Ticket Pricing with Time and Age Discount
  function calculateTicketPrice(age, showTime) {
    const basePrice = 12;
    let discount = 0;
    if (age < 12) {
      discount = 0.40;
    } else if (age > 60) {
      discount = 0.30;
    } else if (showTime < 17) {
      discount = 0.20;
    }
    return basePrice * (1 - discount);
  }
  
  // 6. Job Application Filter
  function isEligibleForJob(age, experience, qualification) {
    if (
      age >= 21 &&
      age <= 55 &&
      experience >= 2 &&
      qualification.toLowerCase().includes("bachelor")
    ) {
      return true;
    }
    return false;
  }
  
  // 7. E-commerce Coupon Redemption
  function applyCoupon(orderAmount, couponCode) {
    const shippingFee = 20;
    let finalPrice;
    if (couponCode === "DISCOUNT10" && orderAmount > 500) {
      finalPrice = orderAmount * 0.9 + shippingFee;
    } else if (couponCode === "FREESHIP" && orderAmount > 200) {
      finalPrice = orderAmount;
    } else {
      finalPrice = orderAmount + shippingFee;
    }
    return finalPrice;
  }
  
  // 8. Fitness Membership Plan
  function choosePlan(planType, wantsTrainer, wantsDietPlan) {
    let recommendedPlan;
    if (wantsTrainer && wantsDietPlan) {
      recommendedPlan = "VIP";
    } else if (wantsTrainer) {
      recommendedPlan = "Premium";
    } else {
      recommendedPlan = "Basic";
    }
    if (planType.toLowerCase() === recommendedPlan.toLowerCase()) {
      return `Your current plan (${planType}) is the best option for you.`;
    } else {
      return `We recommend the ${recommendedPlan} plan for you.`;
    }
  }
  
  // 9. Electricity Bill Calculation with Peak Hours
  function calculateElectricityBill(units, timeOfDay) {
    let rate;
    if (units < 100) {
      rate = 5;
    } else if (units <= 300) {
      rate = 4;
    } else {
      rate = 3;
    }
    let bill = units * rate;
    if (timeOfDay.toLowerCase() === "peak") {
      bill *= 1.1;
    }
    return bill;
  }
  
  // 10. Flight Ticket Booking System
  function calculateFlightFare(classType, luggageWeight, isStudent, isSenior) {
    let fare = 300; // Base fare
    if (classType.toLowerCase() === "business") {
      fare += 200;
    } else if (classType.toLowerCase() === "first") {
      fare += 500;
    }
    if (luggageWeight > 20) {
      const extraWeight = luggageWeight - 20;
      const extraUnits = Math.ceil(extraWeight / 10);
      fare += extraUnits * 50;
    }
    if (isStudent) {
      fare *= 0.85;
    } else if (isSenior) {
      fare *= 0.90;
    }
    return fare;
  }
  
  // Event Listeners for Forms
  document.addEventListener("DOMContentLoaded", function() {
    // ATM Withdrawal
    document.getElementById("atmWithdrawalForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const balance = parseFloat(document.getElementById("atmBalance").value);
      const amount = parseFloat(document.getElementById("atmAmount").value);
      const pin = document.getElementById("atmPin").value;
      const enteredPin = document.getElementById("atmEnteredPin").value;
      const result = atmWithdrawal(balance, amount, pin, enteredPin);
      document.getElementById("atmResult").textContent = result;
    });
  
    // Online Shopping
    document.getElementById("onlineShoppingForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const orderAmount = parseFloat(document.getElementById("orderAmount").value);
      const result = calculateFinalAmount(orderAmount);
      document.getElementById("shoppingResult").textContent = "Final Amount: $" + result;
    });
  
    // Student Grading
    document.getElementById("studentGradingForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const marks = parseFloat(document.getElementById("studentMarks").value);
      const attendance = parseFloat(document.getElementById("studentAttendance").value);
      const result = calculateGrade(marks, attendance);
      document.getElementById("gradingResult").textContent = "Grade: " + result;
    });
  
    // Traffic Light
    document.getElementById("trafficLightForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const density = document.getElementById("trafficDensity").value;
      const result = trafficLightControl(density);
      document.getElementById("trafficResult").textContent = "Green Signal Duration: " + result + " seconds";
    });
  
    // Movie Ticket Pricing
    document.getElementById("movieTicketForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const age = parseFloat(document.getElementById("ticketAge").value);
      const showTime = parseFloat(document.getElementById("showTime").value);
      const result = calculateTicketPrice(age, showTime);
      document.getElementById("ticketResult").textContent = "Ticket Price: $" + result.toFixed(2);
    });
  
    // Job Application Filter
    document.getElementById("jobApplicationForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const age = parseFloat(document.getElementById("jobAge").value);
      const experience = parseFloat(document.getElementById("jobExperience").value);
      const qualification = document.getElementById("jobQualification").value;
      const result = isEligibleForJob(age, experience, qualification);
      document.getElementById("jobResult").textContent = "Eligible: " + result;
    });
  
    // E-commerce Coupon Redemption
    document.getElementById("couponForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const orderAmount = parseFloat(document.getElementById("couponOrderAmount").value);
      const couponCode = document.getElementById("couponCode").value;
      const result = applyCoupon(orderAmount, couponCode);
      document.getElementById("couponResult").textContent = "Final Price: $" + result;
    });
  
    // Fitness Membership Plan
    document.getElementById("fitnessMembershipForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const currentPlan = document.getElementById("currentPlan").value;
      const wantsTrainer = document.getElementById("wantsTrainer").checked;
      const wantsDietPlan = document.getElementById("wantsDietPlan").checked;
      const result = choosePlan(currentPlan, wantsTrainer, wantsDietPlan);
      document.getElementById("fitnessResult").textContent = result;
    });
  
    // Electricity Bill Calculation
    document.getElementById("electricityBillForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const units = parseFloat(document.getElementById("unitsConsumed").value);
      const timeOfDay = document.getElementById("timeOfDay").value;
      const result = calculateElectricityBill(units, timeOfDay);
      document.getElementById("electricityResult").textContent = "Total Bill: $" + result.toFixed(2);
    });
  
    // Flight Ticket Booking
    document.getElementById("flightTicketForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const classType = document.getElementById("flightClass").value;
      const luggageWeight = parseFloat(document.getElementById("luggageWeight").value);
      const isStudent = document.getElementById("isStudent").checked;
      const isSenior = document.getElementById("isSenior").checked;
      const result = calculateFlightFare(classType, luggageWeight, isStudent, isSenior);
      document.getElementById("flightResult").textContent = "Flight Fare: $" + result.toFixed(2);
    });
  });
  