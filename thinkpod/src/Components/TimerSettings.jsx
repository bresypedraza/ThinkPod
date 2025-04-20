import React, { useState, useEffect } from "react";

export function TimerSettings({ setTimerVisible, setTimerOpacity, setTimerSeconds, mode, setMode}) {
    const [studySeconds, setStudySeconds] = useState(1500); // default 25 mins for studying
    const [breakSeconds, setBreakSeconds] = useState(300);  // default 5 mins for break
    const [inputValue, setInputValue] = useState('25');
    const [opacity, setOpacity] = useState(0.5);
    const [unit, setUnit] = useState('minutes'); // 'seconds' | 'minutes' | 'hours'

    useEffect(() => {
        const rawValue = mode === 'study' ? studySeconds : breakSeconds;

        let displayValue;
        switch (unit) {
            case 'hours':
                displayValue = Math.round(rawValue / 3600);
                break;
            case 'minutes':
                displayValue = Math.round(rawValue / 60);
                break;
            default:
                displayValue = rawValue;
        }

        setInputValue(String(displayValue));
    }, [mode, studySeconds, breakSeconds, unit]);

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value === '') {
            setInputValue('');
            return;
        }

        const parsed = parseInt(value, 10);
        if (!isNaN(parsed)) {
            setInputValue(value);

            let seconds;
            switch (unit) {
                case 'hours':
                    seconds = parsed * 3600;
                    break;
                case 'minutes':
                    seconds = parsed * 60;
                    break;
                default:
                    seconds = parsed;
            }

            if (mode === 'study') {
                setStudySeconds(seconds);
            } else {
                setBreakSeconds(seconds);
            }
        }
    };

    const handleApplySettings = () => {
        const time = mode === 'study' ? studySeconds : breakSeconds;
        setTimerSeconds(time);
        setTimerOpacity(opacity);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
            {/* Mode toggle */}
            <div className="flex space-x-2">
                <button
                    onClick={() => {
                        const defaultStudy = 25 * 60;
                        setMode('study');
                        setStudySeconds(defaultStudy);
                        setTimerSeconds(defaultStudy);
                        setTimerOpacity(opacity);
                        setInputValue(
                            unit === 'minutes' ? '25' :
                                unit === 'hours' ? (25 / 60).toFixed(2) :
                                    String(defaultStudy)
                        );
                    }}
                    className={`px-4 py-2 rounded font-bold ${mode === 'study' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    📚 Study Time
                </button>
                <button
                    onClick={() => {
                        const defaultBreak = 5 * 60;
                        setMode('break');
                        setBreakSeconds(defaultBreak);
                        setTimerSeconds(defaultBreak);
                        setTimerOpacity(opacity);
                        setInputValue(
                            unit === 'minutes' ? '5' :
                                unit === 'hours' ? (5 / 60).toFixed(2) :
                                    String(defaultBreak)
                        );
                    }}
                    className={`px-4 py-2 rounded font-bold ${mode === 'break' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    💤 Break Time
                </button>
            </div>

            {/* Unit selector */}
            <div className="flex items-center gap-2">
                <label className="text-gray-700">Units:</label>
                <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                </select>
            </div>

            {/* Time input */}
            <div>
                <label className="block text-gray-700">
                    Timer ({unit}) – {mode}:
                </label>
                <input
                    type="number"
                    min="1"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border rounded px-3 py-1 w-32 text-center"
                />
            </div>

            {/* Opacity input */}
            <div>
                <label className="block text-gray-700">Timer Opacity (0.1 - 1):</label>
                <input
                    type="number"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="border rounded px-3 py-1 w-32 text-center"
                />
            </div>

            {/* Controls */}
            <div className="flex space-x-4">
                <button
                    onClick={handleApplySettings}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Apply
                </button>
                <button
                    onClick={() => setTimerVisible(prev => !prev)}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    Toggle Visibility
                </button>
                {mode === 'study' && (
                    <button
                        onClick={() => {
                            const defaultTime = 25 * 60;
                            setStudySeconds(defaultTime);
                            setInputValue(unit === 'minutes' ? '25' :
                                unit === 'hours' ? (25 / 60).toFixed(2) :
                                    String(defaultTime)
                            );
                            setTimerSeconds(defaultTime);
                            setTimerOpacity(opacity);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Reset to 25 Min
                    </button>
                )}
                {mode === 'break' && (
                    <button
                        onClick={() => {
                            const defaultTime = 5 * 60;
                            setBreakSeconds(defaultTime);
                            setInputValue(unit === 'minutes' ? '5' :
                                unit === 'hours' ? (5 / 60).toFixed(2) :
                                    String(defaultTime)
                            );
                            setTimerSeconds(defaultTime);
                            setTimerOpacity(opacity);
                        }}
                        className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Reset to 5 Min
                    </button>
                )}
            </div>
        </div>
    );
}
