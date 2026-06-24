import React from 'react';

const Register = () => {
	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.32), transparent 35%)' }}></div>
			
			<div className="relative w-full max-w-md">
				<div className="p-0.5 rounded-3xl bg-gradient-to-br from-white/45 to-white/8 shadow-2xl">
					<div className="rounded-3xl p-8 bg-slate-900/92 backdrop-blur-xl text-gray-200">
						<div className="mb-7 text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
								<span className="text-2xl">✦</span>
							</div>
							<h1 className="text-2xl font-black">Create account</h1>
							<p className="mt-2.5 text-slate-400 text-sm leading-relaxed">
								Sign up with your username, email, and password.
							</p>
						</div>

						<form className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-semibold">Username</label>
								<input
									type="text"
									name="username"
									placeholder="Enter your username"
									className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-semibold">Email</label>
								<input
									type="email"
									name="email"
									placeholder="Enter your email"
									className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-semibold">Password</label>
								<input
									type="password"
									name="password"
									placeholder="Create a password"
									className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
								/>
							</div>

							<button type="submit" className="w-full h-12 mt-2 border-0 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white text-base font-bold cursor-pointer shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition">
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
