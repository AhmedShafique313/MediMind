# Sample Medical Report for Testing

You can create a simple PDF with the following content to test the system:

## Test Report Template

```
MEDICAL LABORATORY REPORT

Patient Name: John Doe
Date of Birth: 01/15/1980
Test Date: March 21, 2026
Report ID: LAB-2026-001

COMPLETE METABOLIC PANEL

Glucose, Fasting: 145 mg/dL (Normal: 70-100 mg/dL) HIGH
HbA1c: 6.8% (Normal: <5.7%) HIGH

LIPID PANEL

Total Cholesterol: 258 mg/dL (Normal: <200 mg/dL) HIGH
LDL Cholesterol: 175 mg/dL (Normal: <100 mg/dL) HIGH
HDL Cholesterol: 38 mg/dL (Normal: >40 mg/dL) LOW
Triglycerides: 225 mg/dL (Normal: <150 mg/dL) HIGH

COMPLETE BLOOD COUNT

Hemoglobin: 11.2 g/dL (Normal: 13.5-17.5 g/dL) LOW
Hematocrit: 34% (Normal: 38-50%) LOW
WBC: 8.5 x10³/µL (Normal: 4.5-11.0 x10³/µL) NORMAL
Platelets: 285 x10³/µL (Normal: 150-400 x10³/µL) NORMAL

THYROID FUNCTION

TSH: 5.8 mIU/L (Normal: 0.4-4.0 mIU/L) HIGH
Free T4: 0.7 ng/dL (Normal: 0.8-1.8 ng/dL) LOW

KIDNEY FUNCTION

Creatinine: 1.4 mg/dL (Normal: 0.6-1.2 mg/dL) HIGH
eGFR: 55 mL/min/1.73m² (Normal: >60) LOW
BUN: 28 mg/dL (Normal: 7-20 mg/dL) HIGH

LIVER FUNCTION

ALT: 52 U/L (Normal: 7-40 U/L) HIGH
AST: 48 U/L (Normal: 8-40 U/L) HIGH
Bilirubin: 1.3 mg/dL (Normal: 0.1-1.2 mg/dL) HIGH

VITAMINS & MINERALS

Vitamin D: 18 ng/mL (Normal: 30-100 ng/mL) LOW
Iron: 45 µg/dL (Normal: 60-170 µg/dL) LOW
Ferritin: 18 ng/mL (Normal: 30-400 ng/mL) LOW

CLINICAL NOTES:
Multiple abnormal findings noted. Patient should follow up with
physician for comprehensive evaluation and management plan.
```

## Expected AI Analysis

The system should detect:

1. **Diabetes/Prediabetes**
   - Elevated glucose and HbA1c
   - Status: Detected
   - Severity: Moderate

2. **Hyperlipidemia**
   - High cholesterol, LDL, triglycerides
   - Low HDL
   - Status: Detected
   - Severity: Moderate to Severe

3. **Anemia**
   - Low hemoglobin and hematocrit
   - Status: Detected
   - Severity: Mild to Moderate

4. **Hypothyroidism**
   - High TSH, Low Free T4
   - Status: Detected
   - Severity: Mild

5. **Kidney Disease (Early CKD)**
   - Elevated creatinine, reduced eGFR
   - Status: Detected
   - Severity: Moderate (Stage 3a CKD)

6. **Elevated Liver Enzymes**
   - High ALT/AST
   - Status: Detected
   - Severity: Mild

7. **Vitamin D Deficiency**
   - Low vitamin D levels
   - Status: Detected
   - Severity: Moderate

8. **Iron Deficiency**
   - Low iron and ferritin
   - Status: Detected
   - Severity: Moderate

## Risk Level
Expected: **HIGH** or **CRITICAL**

## Sample Recommendations

The AI should provide recommendations like:
- Consult endocrinologist for diabetes management
- Start lipid-lowering medication
- Iron supplementation for anemia
- Thyroid hormone replacement therapy
- Nephrology referral for kidney function
- Vitamin D supplementation
- Lifestyle modifications (diet, exercise)
- Regular monitoring and follow-up testing

## How to Create Test PDF

### Option 1: Using Word/Google Docs
1. Copy the template above
2. Paste into Word/Google Docs
3. Export/Save as PDF

### Option 2: Using Online PDF Creator
1. Go to any HTML to PDF converter
2. Paste the content
3. Generate PDF

### Option 3: Using Print to PDF
1. Open a text editor
2. Paste the content
3. Print → Save as PDF

## Testing Different Scenarios

### Normal Results (Low Risk)
Change all values to be within normal ranges.

### Critical Results (Critical Risk)
- Glucose >400 mg/dL
- HbA1c >10%
- eGFR <30 mL/min
- Hemoglobin <8 g/dL

### Specific Conditions
Create focused reports testing single conditions like:
- Only thyroid values abnormal
- Only kidney markers abnormal
- Only diabetes markers abnormal

This helps verify the AI correctly identifies specific conditions.
