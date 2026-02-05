import { useState } from 'react';
import { X, Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';

function BulkImportModal({ isOpen, onClose, onImport }) {
  const [step, setStep] = useState(1); // 1: upload, 2: preview, 3: success
  const [csvData, setCsvData] = useState('');
  const [parsedClients, setParsedClients] = useState([]);
  const [errors, setErrors] = useState([]);

  const csvTemplate = `name,phone,email,birthday,notes,skinConditions
John Smith,555-123-4567,john@email.com,1990-05-15,Regular client,None
Sarah Johnson,555-987-6543,sarah@email.com,1985-12-03,First timer,Sensitive skin`;

  const handleDownloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'client_import_template.csv';
    a.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setCsvData(text);
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };

  const handlePasteData = (e) => {
    const text = e.target.value;
    setCsvData(text);
    parseCSV(text);
  };

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      setErrors(['CSV file is empty or invalid']);
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const clients = [];
    const parseErrors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        parseErrors.push(`Line ${i + 1}: Incorrect number of columns`);
        continue;
      }

      const client = {};
      headers.forEach((header, index) => {
        client[header] = values[index];
      });

      // Validation
      if (!client.name) {
        parseErrors.push(`Line ${i + 1}: Name is required`);
        continue;
      }
      if (!client.phone) {
        parseErrors.push(`Line ${i + 1}: Phone is required`);
        continue;
      }

      clients.push(client);
    }

    setParsedClients(clients);
    setErrors(parseErrors);
    
    if (clients.length > 0) {
      setStep(2);
    }
  };

  const handleImport = () => {
    onImport(parsedClients);
    setStep(3);
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setCsvData('');
    setParsedClients([]);
    setErrors([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-secondary rounded-xl border border-border-primary max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-2xl font-bold">Bulk Import Clients</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-bg-primary p-4 rounded-lg border border-border-primary">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-accent-warning" />
                  CSV Format Required
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Your CSV must include these columns: <code className="bg-bg-tertiary px-2 py-1 rounded">name, phone, email, birthday, notes, skinConditions</code>
                </p>
                <button
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download CSV Template
                </button>
              </div>

              {/* Upload Options */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* File Upload */}
                <div>
                  <h3 className="font-semibold mb-3">Upload CSV File</h3>
                  <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-border-primary hover:border-accent-primary rounded-lg p-8 text-center transition">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-text-tertiary" />
                      <p className="text-text-secondary mb-2">Click to upload CSV</p>
                      <p className="text-xs text-text-tertiary">or drag and drop</p>
                    </div>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Paste Data */}
                <div>
                  <h3 className="font-semibold mb-3">Paste from Excel/Sheets</h3>
                  <textarea
                    value={csvData}
                    onChange={handlePasteData}
                    placeholder="Paste your CSV data here..."
                    className="w-full h-40 px-4 py-3 bg-bg-primary border border-border-primary rounded-lg focus:outline-none focus:border-accent-primary transition resize-none font-mono text-sm"
                  />
                </div>
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="bg-accent-danger/10 border border-accent-danger/30 rounded-lg p-4">
                  <h4 className="font-semibold text-accent-danger mb-2">Errors Found:</h4>
                  <ul className="text-sm text-accent-danger space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-accent-success/10 border border-accent-success/30 rounded-lg p-4">
                <h3 className="font-semibold text-accent-success mb-2">
                  ✓ {parsedClients.length} clients ready to import
                </h3>
                <p className="text-sm text-text-secondary">
                  Review the preview below and click "Import All" to add these clients.
                </p>
              </div>

              {/* Preview Table */}
              <div className="border border-border-primary rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full">
                    <thead className="bg-bg-tertiary sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Birthday</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-primary">
                      {parsedClients.slice(0, 10).map((client, index) => (
                        <tr key={index} className="hover:bg-bg-tertiary/50">
                          <td className="px-4 py-3 text-sm">{client.name}</td>
                          <td className="px-4 py-3 text-sm">{client.phone}</td>
                          <td className="px-4 py-3 text-sm">{client.email || 'N/A'}</td>
                          <td className="px-4 py-3 text-sm">{client.birthday || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {parsedClients.length > 10 && (
                  <div className="bg-bg-tertiary px-4 py-2 text-sm text-text-secondary text-center">
                    Showing first 10 of {parsedClients.length} clients
                  </div>
                )}
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="bg-accent-warning/10 border border-accent-warning/30 rounded-lg p-4">
                  <h4 className="font-semibold text-accent-warning mb-2">
                    {errors.length} rows skipped due to errors
                  </h4>
                  <ul className="text-sm text-text-secondary space-y-1 max-h-32 overflow-y-auto">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-bg-primary border border-border-primary rounded-lg font-semibold hover:bg-bg-tertiary transition"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  className="flex-1 px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
                >
                  Import {parsedClients.length} Clients
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-12">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-accent-success" />
              <h3 className="text-2xl font-bold mb-2">Import Successful!</h3>
              <p className="text-text-secondary mb-6">
                {parsedClients.length} clients have been added to your database.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-accent-primary hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BulkImportModal;