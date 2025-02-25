"use client";
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CalendarIcon, PersonStandingIcon} from "lucide-react";
import {date, z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {format} from "date-fns";
import {PasswordInput} from "@/components/ui/password-input";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";

const accountTypeSchema = z.object({
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
    if (data.accountType === "company" && !data.companyName) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["companyName"],
            message: "Company name is required"
        });
    }
    if (data.accountType === "company" && (!data.numberOfEmployees || data.numberOfEmployees < 1)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["numberOfEmployees"],
            message: "Number employees is required"
        });
    }
});

const passwordSchema = z.object({
    password: z.string().min(8, "Password must contain at least 8 characters!").refine((password) => {
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
    }, "Password must contain at least 1 special character and 1 uppercase character!"),
    passwordConfirm: z.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["passwordConfirm"],
            message: "Password do not match!"
        })
    }
});

const baseSchema = z.object({
    email: z.string().email(),
    dob: z.date().refine((date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDay()
        );
        return date <= eighteenYearsAgo;
    }, "you must be at least 18 years old"),
    acceptTerms: z.boolean({
        required_error: "you must accept terms and conditions!",
    }).refine((checked) => checked, "you must accept terms and conditions!"),
});

const formSchema = baseSchema.and(accountTypeSchema).and(passwordSchema);

const SignUpPage = () => {
    const {push} = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            companyName: "",
        }
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Signup validation successfully", data);
        push("/dashboad");
    }

    const accountType = form.watch("accountType");

    const dobFromDate = new Date();
    dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

    return (
        <>
            <PersonStandingIcon size={50} className="text-primary"/>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>Sign up to SupportMe account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@dev.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Account type</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an account type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="personal">Personal</SelectItem>
                                                <SelectItem value="company">Company</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {accountType === "company" &&
								<>
									<FormField
										control={form.control}
										name="companyName"
										render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Company name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Company name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
									/>
									<FormField
										control={form.control}
										name="numberOfEmployees"
										render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Employees</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number" min={0} placeholder="Employees" {...field}
                                                        value={field.value ?? ""}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
									/>
								</>
                            }

                            <FormField
                                control={form.control}
                                name="dob"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className="normal-case flex justify-between px-3">
                                                        {!!field.value ? format(field.value, "PPP") :
                                                            <span>Pick a date</span>
                                                        }
                                                        <CalendarIcon />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent align="start" className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    defaultMonth={field.value}
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    fixedWeeks
                                                    weekStartsOn={1}
                                                    fromDate={dobFromDate}
                                                    toDate={new Date()}
                                                    captionLayout="dropdown-buttons"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <PasswordInput placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="acceptTerms"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex gap-2 items-center">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>I accept th terms and conditions</FormLabel>
                                        </div>
                                        <FormDescription>
                                            By signing up you agree to our <Link className="text-primary hover:underline" href="#">terms and conditions.</Link>
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <Button type="submit" className="w-full">Sign up</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-between">
                    <small>Already have a account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/login">Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default SignUpPage;