import React, { useState } from 'react';

export default function RegistrationForm() {
    const [form, setForm] = useState({
        full_name: '',
        address: '',
        email: '',
        password: '',
        confirm_password: '',
        date_birth: '',
        sex: 'Hombre',
        interests: [],
        hobbies: ''
    });
    const [confirmed, setConfirmed] = useState(null);

    const interestOptions = ['Ficción', 'Terror', 'Acción', 'Comedia', 'Suspense'];

    function toggleInterest(val) {
        setForm(f => {
            const exists = f.interests.includes(val);
            return { ...f, interests: exists ? f.interests.filter(x => x !== val) : [...f.interests, val] };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm_password) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const resp = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: form.full_name,
                address: form.address,
                email: form.email,
                password: form.password,
                date_birth: form.date_birth,
                sex: form.sex,
                interests: form.interests,
                hobbies: form.hobbies
            })
        });

        const data = await resp.json();
        if (resp.ok) {
            setConfirmed({
                full_name: form.full_name,
                address: form.address,
                email: form.email,
                date_birth: form.date_birth,
                sex: form.sex,
                interests: form.interests.join(', '),
                hobbies: form.hobbies
            });
        } else {
            alert(data.error || 'Error al registrar');
        }
    };

    if (confirmed) {
        // Página de confirmación
        return (
            <div style={{ maxWidth: 600, margin: '20px auto', border: '1px solid #ccc', padding: 20, background: '#f8f8ff' }}>
                <h3>Página de confirmación del registro de usuario</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                    <tr><td><strong>Nombre completo</strong></td><td>{confirmed.full_name}</td></tr>
                    <tr><td><strong>Dirección</strong></td><td>{confirmed.address}</td></tr>
                    <tr><td><strong>Correo electrónico</strong></td><td>{confirmed.email}</td></tr>
                    <tr><td><strong>Fecha de nacimiento</strong></td><td>{confirmed.date_birth}</td></tr>
                    <tr><td><strong>Sexo</strong></td><td>{confirmed.sex}</td></tr>
                    <tr><td><strong>Temas de interés</strong></td><td>{confirmed.interests}</td></tr>
                    <tr><td><strong>Aficiones</strong></td><td>{confirmed.hobbies}</td></tr>
                    </tbody>
                </table>
                <button onClick={() => setConfirmed(null)} style={{ marginTop: 10 }}>Volver</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '20px auto', padding: 20, border: '1px solid #999', background: '#eee' }}>
            <h3>Formulario de inscripción de usuarios</h3>

            <div>
                <label>Nombre completo</label><br />
                <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
            </div>

            <div>
                <label>Dirección</label><br />
                <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={3} />
            </div>

            <div>
                <label>Correo electrónico</label><br />
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
                <label>Contraseña</label><br />
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>

            <div>
                <label>Confirmar contraseña</label><br />
                <input type="password" value={form.confirm_password} onChange={e => setForm({ ...form, confirm_password: e.target.value })} required />
            </div>

            <div>
                <label>Fecha de nacimiento</label><br />
                <input type="date" value={form.date_birth} onChange={e => setForm({ ...form, date_birth: e.target.value })} />
            </div>

            <div>
                <label>Sexo</label><br />
                <label><input type="radio" checked={form.sex === 'Hombre'} onChange={() => setForm({ ...form, sex: 'Hombre' })} /> Hombre</label>
                <label style={{ marginLeft: 10 }}><input type="radio" checked={form.sex === 'Mujer'} onChange={() => setForm({ ...form, sex: 'Mujer' })} /> Mujer</label>
                <label style={{ marginLeft: 10 }}><input type="radio" checked={form.sex === 'Otro'} onChange={() => setForm({ ...form, sex: 'Otro' })} /> Otro</label>
            </div>

            <div>
                <label>Temas de interés</label><br />
                {interestOptions.map(opt => (
                    <label key={opt} style={{ display: 'inline-block', width: 120 }}>
                        <input type="checkbox" checked={form.interests.includes(opt)} onChange={() => toggleInterest(opt)} /> {opt}
                    </label>
                ))}
            </div>

            <div>
                <label>Aficiones</label><br />
                <input value={form.hobbies} onChange={e => setForm({ ...form, hobbies: e.target.value })} placeholder="Ej: Música, Lectura, Deportes" />
            </div>

            <div style={{ marginTop: 10 }}>
                <button type="submit">Confirmar datos</button>
            </div>
        </form>
    );
}
