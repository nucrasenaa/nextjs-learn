'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CodeBlock from '@/components/CodeBlock';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function FormValidationPage() {
    const { dict, language } = useLanguage();
    const t = dict.lessons.formValidation;
    const [isSuccess, setIsSuccess] = useState(false);

    // 1. Define Schema with Zod
    const schema = z.object({
        username: z.string().min(3, language === 'th' ? 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร' : 'Username must be at least 3 characters'),
        email: z.string().email(language === 'th' ? 'กรุณากรอกอีเมลที่ถูกต้อง' : 'Please enter a valid email'),
        password: z.string().min(6, language === 'th' ? 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' : 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: language === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match',
        path: ['confirmPassword'],
    });

    type FormData = z.infer<typeof schema>;

    // 2. Initialize Hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        // Simulate API Call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Form Data:', data);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="space-y-12 pb-20">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-4">
                    {t.title}
                </h1>
                <p className="text-lg text-slate-300">
                    {t.intro}
                </p>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-white border-l-4 border-emerald-500 pl-4">{t.basicTitle}</h2>
                <p className="text-slate-400">{t.basicDesc}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Live Demo Form */}
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Username */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">{t.username}</label>
                                <input
                                    {...register('username')}
                                    className={`w-full bg-slate-900 border ${errors.username ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                                    placeholder="yourname"
                                />
                                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">{t.email}</label>
                                <input
                                    {...register('email')}
                                    className={`w-full bg-slate-900 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                                    placeholder="email@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">{t.password}</label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className={`w-full bg-slate-900 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                                />
                                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">{t.confirmPassword}</label>
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`w-full bg-slate-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                                />
                                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold text-black transition-all ${
                                    isSubmitting ? 'bg-slate-600' : 'bg-emerald-400 hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                                }`}
                            >
                                {isSubmitting ? t.submitting : t.submit}
                            </button>

                            {isSuccess && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-center animate-bounce">
                                    {t.success}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Explanation Code */}
                    <div className="space-y-6">
                        <CodeBlock
                            title="ValidationSchema.ts"
                            code={`const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
}).refine(data => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});`}
                        />
                        <CodeBlock
                            title="RegisterForm.tsx"
                            code={`const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('username')} />
    {errors.username && <span>{errors.username.message}</span>}
    
    <button type="submit">Submit</button>
  </form>
);`}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
