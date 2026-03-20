'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { useReportStore } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { MedicalReport } from '@/types';

export default function FileUpload() {
  const { addReport, updateReport, setIsUploading } = useReportStore();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploadError(null);

      for (const file of acceptedFiles) {
        const reportId = generateId();
        const tempReport: MedicalReport = {
          id: reportId,
          fileName: file.name,
          uploadDate: new Date(),
          fileSize: file.size,
          status: 'processing',
        };

        addReport(tempReport);
        setIsUploading(true);

        try {
          // Upload and parse PDF
          const formData = new FormData();
          formData.append('file', file);

          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          const uploadData = await uploadRes.json();

          if (!uploadData.success) {
            throw new Error(uploadData.error || 'Upload failed');
          }

          // Update report with extracted text
          updateReport(reportId, {
            extractedText: uploadData.extractedText,
          });

          // Analyze report
          const analyzeRes = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reportId,
              extractedText: uploadData.extractedText,
            }),
          });

          const analyzeData = await analyzeRes.json();

          if (!analyzeData.success) {
            throw new Error(analyzeData.error || 'Analysis failed');
          }

          // Update report with analysis
          updateReport(reportId, {
            status: 'completed',
            analysis: analyzeData.analysis,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
          updateReport(reportId, {
            status: 'failed',
            error: errorMessage,
          });
          setUploadError(errorMessage);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [addReport, updateReport, setIsUploading]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload
          className={`mx-auto h-12 w-12 mb-4 ${
            isDragActive ? 'text-primary-500' : 'text-gray-400'
          }`}
        />
        <p className="text-lg font-medium text-gray-700 mb-2">
          {isDragActive ? 'Drop PDF files here' : 'Upload Medical Reports'}
        </p>
        <p className="text-sm text-gray-500">
          Drag & drop PDF files or click to browse
        </p>
        <p className="text-xs text-gray-400 mt-2">Maximum file size: 10MB</p>
      </div>

      {uploadError && (
        <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg flex items-start">
          <X className="h-5 w-5 text-danger-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-danger-800">Upload Error</p>
            <p className="text-sm text-danger-600 mt-1">{uploadError}</p>
          </div>
        </div>
      )}
    </div>
  );
}
