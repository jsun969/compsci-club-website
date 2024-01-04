import Button from '@/components/Button';
import Field from '@/components/Field';
import validateFields from '@/util/validation';
import React, { useState } from 'react';
import { z } from 'zod';
import ProgressBar from './ProgressBar';

interface StepOneProps {
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    studentID: string;
    setStudentID: React.Dispatch<React.SetStateAction<string>>;
    nextStep: () => void;
}

// Define validation schemas
const firstNameSchema = z
    .string()
    .min(1, { message: 'Please enter a first name' })
    .regex(/^[a-zA-Z]+$/, {
        message: 'Please enter a valid first name',
    });
const lastNameSchema = z
    .string()
    .min(1, { message: 'Please enter a last name' })
    .regex(/^[a-zA-Z]+$/, {
        message: 'Please enter a valid last name',
    });
const studentIdSchema = z
    .string()
    .min(1, { message: 'Please enter a student ID' })
    .regex(/^a\d{7}$/, {
        message: 'Please enter a valid student ID (format: aXXXXXXX)',
    });

export default function StepOne({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    studentID,
    setStudentID,
    nextStep,
}: StepOneProps) {
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [studentIDError, setStudentIDError] = useState<string | null>(null);

    const fields = [firstName, lastName, studentID];
    const schemas = [firstNameSchema, lastNameSchema, studentIdSchema];
    const setErrors = [setFirstNameError, setLastNameError, setStudentIDError];

    const handleContinue = async () => {
        validateFields(fields, schemas, setErrors, nextStep);
    };

    return (
        <div>
            {/* Heading */}
            <h3 className="font-bold text-3xl">Welcome</h3>
            <p className="text-xl">Let's get to know you!</p>
            {/* Progress Bar */}
            <ProgressBar ducksFilled={1}></ProgressBar>
            {/* Form fields */}
            <Field
                label="First Name"
                value={firstName}
                onChange={(value) => setFirstName(value)}
                error={firstNameError}
            />
            <Field
                label="Last Name"
                value={lastName}
                onChange={(value) => setLastName(value)}
                error={lastNameError}
            />
            <Field
                label="Student ID (N/A if not at University of Adelaide)"
                value={studentID}
                onChange={(value) => setStudentID(value)}
                error={studentIDError}
            />
            {/* Button */}
            <div className="flex w-full mt-8 mb-4">
                <Button onClick={handleContinue} colour="orange" width="w-[25rem]">
                    Continue
                </Button>
            </div>
        </div>
    );
}