import React from 'react';

const Resume = () => {
    return (
        <div id="resume-section" className="min-h-screen bg-white text-black p-8 md:p-16 font-serif animate-fade-up pb-32">
            <div className="max-w-[850px] mx-auto">
                {/* Header */}
                <header className="text-center border-b border-black pb-4 mb-6">
                    <h1 className="text-3xl font-bold uppercase mb-2 tracking-wide">Neric Joel</h1>
                    <p className="text-sm">
                        Tempe, AZ | +1 (602) 756-5790 | nericjoel07@gmail.com | <a href="https://linkedin.com/in/neric-joel" target="_blank" rel="noreferrer" className="text-blue-800 underline">linkedin.com/in/neric-joel</a>
                    </p>
                </header>

                {/* Education */}
                <section className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-black mb-3">Education</h2>
                    <div className="mb-3">
                        <div className="flex justify-between font-bold text-sm">
                            <span>Arizona State University, Tempe, AZ</span>
                            <span>Aug 2025 – Present</span>
                        </div>
                        <div className="text-sm italic">Master of Science in Computer Science</div>
                        <div className="text-sm">Focus: Artificial Intelligence, Embedded Systems, and Data-Driven Modeling</div>
                        <div className="text-sm">Relevant Coursework: Machine Learning, Deep Learning, Distributed Systems, Advanced Algorithms, VLSI Design</div>
                    </div>
                    <div>
                        <div className="flex justify-between font-bold text-sm">
                            <span>Amrita Vishwa Vidyapeetham, Coimbatore, India</span>
                            <span>Sep 2021 – May 2025</span>
                        </div>
                        <div className="text-sm italic">Bachelor of Technology in Electrical and Electronics Engineering</div>
                        <div className="text-sm">Graduated with Distinction | Recipient, First Slab Merit Scholarship (Academic Excellence)</div>
                        <div className="text-sm">Capstone: AI-driven Solar PV Emulator Optimization</div>
                    </div>
                </section>

                {/* Technical Skills */}
                <section className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-black mb-3">Technical Skills</h2>
                    <ul className="text-sm list-none space-y-1">
                        <li><strong>Languages:</strong> Python, C++, MATLAB, C, SQL, PostgreSQL</li>
                        <li><strong>AI/ML:</strong> TensorFlow, scikit-learn, Deep Learning, U-Net, ResNet-50, OpenCV</li>
                        <li><strong>Hardware:</strong> Cadence Virtuoso, LTSpice, Microcontrollers, PCB Design, IoT Systems</li>
                        <li><strong>Tools:</strong> Git, Linux, VS Code, Jupyter, Google Colab, Simulink, Blynk IoT</li>
                    </ul>
                </section>

                {/* Experience */}
                <section className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-black mb-3">Experience</h2>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold text-sm">
                            <span>Research Assistant – PV Systems Lab, Amrita University</span>
                            <span>Jan 2024 – May 2024</span>
                        </div>
                        <ul className="text-sm list-disc ml-5 mt-1">
                            <li>Developed a solar PV emulator with AI-based MPPT (Maximum Power Point Tracking) algorithms to enhance solar cell efficiency.</li>
                            <li>Modeled PV characteristics using MATLAB and Python for real-time performance prediction.</li>
                            <li>Co-authored IEEE paper on optimization algorithms for PV performance enhancement.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold text-sm">
                            <span>Student Lead – Amritavotav Technical Events, Amrita University</span>
                            <span>Sep 2024 – Oct 2024</span>
                        </div>
                        <ul className="text-sm list-disc ml-5 mt-1">
                            <li>Led university-wide technical competitions with 50+ teams and mentored undergraduates in embedded systems and IoT projects.</li>
                            <li>Oversaw event execution, judging criteria, and technical presentation management.</li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex justify-between font-bold text-sm">
                            <span>Intern – Electrical Design, Ranga and Company, Chennai</span>
                            <span>May 2023 – Jun 2023</span>
                        </div>
                        <ul className="text-sm list-disc ml-5 mt-1">
                            <li>Designed and simulated electrical distribution systems adhering to safety and compliance standards.</li>
                            <li>Created documentation and assisted in schematic design, testing, and workflow optimization.</li>
                        </ul>
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-black mb-3">Projects</h2>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold text-sm">
                            <span>Satellite Image Segmentation (AI)</span>
                        </div>
                        <ul className="text-sm list-disc ml-5 mt-1">
                            <li>Achieved 91% segmentation accuracy by training ResNet-50 and U-Net models on satellite imagery using TensorFlow.</li>
                            <li>Automated urban land-use classification, reducing manual annotation time by 60%.</li>
                            <li>Improved model generalization by applying data augmentation and batch normalization techniques.</li>
                        </ul>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold text-sm">
                            <span>AI-Driven Solar PV Emulator</span>
                        </div>
                        <ul className="text-sm list-disc ml-5 mt-1">
                            <li>Increased solar energy efficiency by 15% through developing an AI-based MPPT control model integrated with real-time hardware monitoring.</li>
                            <li>Built and tested MATLAB-microcontroller feedback systems for adaptive power regulation.</li>
                            <li>Enhanced model performance using machine learning regression to predict maximum power output under variable sunlight.</li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex justify-between font-bold text-sm">
                            <span>Eye-Tracking Autonomous Parking Car</span>
                        </div>
                        <ul className="text-sm list-disc ml-5 mt-1">
                            <li>Designed an Arduino-controlled car capable of motion and auto-parking via eye-blink detection using IR and ultrasonic sensors.</li>
                            <li>Improved accessibility for mobility-impaired users by introducing non-contact control.</li>
                            <li>Reduced system latency by optimizing C++ sensor communication and control algorithms.</li>
                        </ul>
                    </div>
                </section>

                {/* Publications */}
                <section className="mb-6">
                    <h2 className="text-base font-bold uppercase border-b border-black mb-3">Publications</h2>
                    <ul className="text-sm list-disc ml-5 space-y-2">
                        <li>“Design and Comparative Analysis of CMOS, FS-GDI, and MGDI-Based Ripple Carry Adders for Low Power VLSI Applications,” <em>IEEE</em>, May 2025.</li>
                        <li>“Optimal Parameter Estimation Techniques for Enhanced Performance of Solar PV Cell,” <em>IEEE</em>, Apr 2025.</li>
                    </ul>
                </section>

                {/* Leadership */}
                <section>
                    <h2 className="text-base font-bold uppercase border-b border-black mb-3">Leadership & Activities</h2>
                    <ul className="text-sm list-disc ml-5 space-y-1">
                        <li>Volunteer, IEEE Student Branch – Organized embedded systems and circuit design workshops.</li>
                        <li>Member, AI Club at ASU – Collaborated on image recognition and ML pipeline projects.</li>
                        <li>Mentored 10+ students in Arduino-based automation and Python programming.</li>
                    </ul>
                </section>

                {/* Print Button (Hidden when printing) */}
                <div className="fixed bottom-8 right-24 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-sans font-bold flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save as PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Resume;
