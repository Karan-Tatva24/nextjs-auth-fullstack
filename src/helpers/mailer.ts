import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";

// interface Email {
//   email: string;
//   emailType: "VERIFY" | "RESET";
//   userId: object;
// }

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    console.log("objects sent", hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiration: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiration: Date.now() + 3600000,
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d3f4fb1fc996f4",
        pass: "c62c72e585ed3a",
      },
    });

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
