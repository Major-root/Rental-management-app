class Html {
  forgotPasswordEmail = (resetUrl, firstName) => {
    return `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
      <tbody>
        <tr>
          <td align="center">
            <table style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0" width="600" border="0" cellspacing="0" cellpadding="40">
              <tbody>
                <tr>
                  <td align="center">
                    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;text-align:left;width:465px">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
                        <tbody>
                          <tr>
                            <td align="center">
                              <div>
                                <img src="https://futoictc.com/assets/logo-white-8eb97cf5.svg" width="155" height="65" alt="logo" class="CToWUd" data-bit="iit">
                              </div>
                              <h1 style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:18px;font-weight:normal;margin:30px 0;padding:0">Reset your password for <b>Major Rentals Mann</b></h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;line-height:24px">Hello <b>${firstName}</b>,</p>
                      <p style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;line-height:24px">It looks like you requested a password reset. To reset your password, please click the button below:</p>
                      <br>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
                        <tbody>
                          <tr>
                            <td align="center">
                              <a href="${resetUrl}" style="display:inline-block;background-color:#3FBD98;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:15px 25px;border-radius:5px">Reset Password</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;line-height:24px;margin-top:20px">The link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
                      <hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%">
                      <p style="color:#666666;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:14px;line-height:24px">If you have any questions, feel free to contact our support team.</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`;
  };
  
  verifyEmailTemplate = (verificationUrl, firstName) => {
    return `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
      <tbody>
        <tr>
          <td align="center">
            <table style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0" width="600" border="0" cellspacing="0" cellpadding="40">
              <tbody>
                <tr>
                  <td align="center">
                    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;text-align:left;width:465px">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
                        <tbody>
                          <tr>
                            <td align="center">
                              <div>
                                <img src="https://futoictc.com/assets/logo-white-8eb97cf5.svg" width="155" height="65" alt="logo" class="CToWUd" data-bit="iit">
                              </div>
                              <h1 style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:18px;font-weight:normal;margin:30px 0;padding:0">Welcome to <b>Major Rentals Mann</b></h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;line-height:24px">Hello <b>${firstName}</b>,</p>
                      <p style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;line-height:24px">Thank you for registering with Major Rentals Mann! To complete your registration, please verify your email address by clicking the button below:</p>
                      <br>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
                        <tbody>
                          <tr>
                            <td align="center">
                              <a href="${verificationUrl}" style="display:inline-block;background-color:#3FBD98;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:15px 25px;border-radius:5px">Verify Email</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:16px;line-height:24px;margin-top:20px">If you did not register for an account, you can ignore this email. If you have any questions or need support, feel free to contact us.</p>
                      <hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%">
                      <p style="color:#666666;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:14px;line-height:24px">Best regards,<br>The Major Rentals Mann Team</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`;
  };
    
  
  }
  
  exports.html = new Html();
  