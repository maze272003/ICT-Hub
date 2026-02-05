<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to TEchNest</title>
    <style>
        body {
            font-family: 'Poppins', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9fa;
            padding: 20px;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-message {
            font-size: 18px;
            margin-bottom: 30px;
            color: #0f172a;
        }
        .account-details {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        .account-details h3 {
            margin: 0 0 20px 0;
            color: #0f172a;
            font-size: 20px;
            font-weight: 600;
        }
        .detail-row {
            display: flex;
            margin-bottom: 15px;
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 10px;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .detail-label {
            font-weight: 600;
            color: #495057;
            min-width: 120px;
            margin-right: 15px;
        }
        .detail-value {
            color: #0f172a;
            font-weight: 500;
        }
        .important-notes {
            background-color: #e3f2fd;
            border-left: 4px solid #1976d2;
            padding: 20px;
            margin: 25px 0;
        }
        .important-notes h4 {
            margin: 0 0 10px 0;
            color: #1976d2;
            font-size: 16px;
        }
        .important-notes ul {
            margin: 0;
            padding-left: 20px;
        }
        .important-notes li {
            margin-bottom: 5px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 30px 0;
            box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 0;
            color: #6c757d;
            font-size: 14px;
        }
        .footer .school-info {
            margin-top: 15px;
            font-weight: 600;
            color: #0f172a;
        }
        .security-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
        }
        .security-notice strong {
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to TEchNest</h1>
            <p>Fort Magsaysay National High School • ICT-TLE Learning Hub</p>
        </div>

        <div class="content">
            <div class="welcome-message">
                Dear {{ $user->name }},
                <br><br>
                Congratulations! Your student account has been successfully created in our TEchNest learning platform.
            </div>

            <div class="account-details">
                <h3>📋 Your Account Details</h3>
                <div class="detail-row">
                    <div class="detail-label">Full Name:</div>
                    <div class="detail-value">{{ $user->name }}</div>
                </div>
                @if($user->lrn)
                <div class="detail-row">
                    <div class="detail-label">LRN:</div>
                    <div class="detail-value">{{ $user->lrn }}</div>
                </div>
                @endif
                <div class="detail-row">
                    <div class="detail-label">Email:</div>
                    <div class="detail-value">{{ $user->email }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Role:</div>
                    <div class="detail-value">{{ ucfirst($user->role) }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Status:</div>
                    <div class="detail-value">Active</div>
                </div>
            </div>

            <div class="security-notice">
                <strong>🔒 Security Notice:</strong> Your password has been securely stored using industry-standard encryption. For your account security, we recommend changing your password after first login.
            </div>

            <div class="important-notes">
                <h4>📚 Getting Started</h4>
                <ul>
                    <li>Access TEchNest at: <strong>{{ config('app.url') }}</strong></li>
                    <li>Use your email address and password to log in</li>
                    <li>Complete your email verification if prompted</li>
                    <li>Explore available ICT and TLE learning modules</li>
                    <li>Download resources and complete assessments</li>
                </ul>
            </div>

            <div style="text-align: center;">
                <a href="{{ route('login') }}" class="cta-button">🚀 Access Your Account</a>
            </div>

            <p style="margin-top: 30px; color: #6c757d; font-size: 14px; text-align: center;">
                If you have any questions or need assistance, please contact your ICT-TLE subject teacher or school administration.
            </p>
        </div>

        <div class="footer">
            <p>This is an automated message from the TEchNest Learning Management System</p>
            <div class="school-info">
                Fort Magsaysay National High School<br>
                ICT-TLE Department • Grade 10 Research Project<br>
                2026 Academic Year
            </div>
        </div>
    </div>
</body>
</html>
