import { useEffect, useState } from 'react';

export default function IpWhitelistPage() {
	const [entries, setEntries] = useState<
		Array<{
			id: string;
			ipAddress: string;
			description: string;
			enabled: boolean;
			createdBy: string;
			createdAt: Date;
		}>
	>([]);

	const [ip, setIp] = useState('');
	const [desc, setDesc] = useState('');

	const load = async () => {
		const r = await fetch('/api/ip-whitelist');
		const d = await r.json();
		setEntries(d.data || []);
	};

	useEffect(() => {
		load();
	}, []);

	const add = async (e: React.FormEvent) => {
		e.preventDefault();
		await fetch('/api/ip-whitelist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ipAddress: ip, description: desc }),
		});
		setIp('');
		setDesc('');
		load();
	};

	const del = async (id: string) => {
		if (!confirm('Delete this IP?')) return;
		await fetch(`/api/ip-whitelist/${id}`, { method: 'DELETE' });
		load();
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>IP Whitelist</h1>
			<form onSubmit={add} style={{ marginBottom: 20 }}>
				<input
					onChange={(e) => setIp(e.target.value)}
					placeholder="IP Address (e.g., 192.168.1.0/24)"
					required
					style={{ marginRight: 10, padding: 8, width: 250 }}
					value={ip}
				/>
				<input
					onChange={(e) => setDesc(e.target.value)}
					placeholder="Description"
					required
					style={{ marginRight: 10, padding: 8, width: 250 }}
					value={desc}
				/>
				<button style={{ padding: 8 }} type="submit">
					Add IP
				</button>
			</form>
			<div>
				{entries.length === 0 && <p>No IP whitelist entries yet.</p>}
				{entries.map((e) => (
					<div
						key={e.id}
						style={{
							border: '1px solid #ddd',
							padding: 12,
							marginBottom: 8,
							borderRadius: 4,
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div>
								<strong style={{ fontFamily: 'monospace', fontSize: 16 }}>
									{e.ipAddress}
								</strong>
								<p style={{ margin: '4px 0 0 0', color: '#666' }}>
									{e.description}
								</p>
							</div>
							<button
								onClick={() => del(e.id)}
								style={{
									padding: '6px 12px',
									background: '#dc3545',
									color: 'white',
									border: 'none',
									borderRadius: 4,
									cursor: 'pointer',
								}}
								type="button"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
