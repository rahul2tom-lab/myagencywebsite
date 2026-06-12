'use client';

export default function ProtocolModal({ data, onClose }) {
    if (!data) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay active" onClick={handleBackdropClick}>
            <div className="modal-container">
                <div className="modal-bar"></div>
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <div className="system-tag">{data.tag}</div>
                            <h3 className="modal-title">{data.title}</h3>
                        </div>
                        <button className="modal-close" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p className="modal-description">{data.desc}</p>
                        <div className="modal-specs">
                            <div className="modal-spec-row">
                                <span className="modal-spec-label">Deliverable Cadence</span>
                                <span className="modal-spec-value">{data.cadence}</span>
                            </div>
                            <div className="modal-spec-row">
                                <span className="modal-spec-label">Target Channels</span>
                                <span className="modal-spec-value">{data.channels}</span>
                            </div>
                            <div className="modal-spec-row">
                                <span className="modal-spec-label">Key Objective</span>
                                <span className="modal-spec-value">{data.objective}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
