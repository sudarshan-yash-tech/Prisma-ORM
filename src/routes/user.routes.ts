import { Router } from "express";
import { Prisma } from "@prisma/client";
import { deleteUser, getUser, listUsers, updateUser } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { prisma } from "../config/prisma.js";

const router = Router();

router.post('/student', asyncHandler(async (req, res) => {
    const { email, fullName, phoneNumber } = req.body;

    if (!email || !fullName) {
        return res.status(400).json({ success: false, message: "Email and full name are required" });
    }

    const student = await prisma.student.createMany({
        data: [{
            email,
            fullName,
            phoneNumber
        }],
        skipDuplicates: true
    });

    res.status(201).json({ success: true, data: student });
}));

router.put('/student/:id', asyncHandler(async (req, res) => {
    const { email, fullName, phoneNumber } = req.body;
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Student ID is required" });
    }

    try {
        const student = await prisma.student.update({
            where: { id: Number(id) },
            data: { email, fullName, phoneNumber }
        });

        return res.status(200).json({ success: true, data: student });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new ApiError(409, "Email is already in use");
        }

        throw error;
    }
}));

router.put('/student', asyncHandler(async (req, res) => {
    let done = await prisma.enrollment.updateMany({
        where: {
            status: "PENDING"
        },
        data: {
            status: "COMPLETED"
        }
    });

    return res.status(200).json({ success: true, data: done });

}));

router.get('/student', asyncHandler(async (req, res) => {
    const students = await prisma.student.findMany({
        where: {
            enrollments: {
                some: {
                    course: {
                        exams: {
                            some: {
                                marks: {
                                    some: {
                                        score: { gt: 50 }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        include: {
            enrollments: {
                include: {
                    course: {
                        include: {
                            exams: {
                                include: { marks: true }
                            }
                        }
                    }
                }
            }
        }
    });

    return res.status(200).json({ success: true, data: students });
}));

router.get('/student/:email', asyncHandler(async (req, res) => {
    const { email } = req.params;

    let student = await prisma.student.findMany({
        where: { email: String(email) },
    })

    return res.status(200).json({ success: true, data: student });
}))

// Marks 
router.get('/marks/avg', asyncHandler(async (req, res) => {
    const avgMarks = await prisma.course.findMany({
        include: {
            _count: {
                select: {
                    exams: true
                }
            }
        }
    });

    return res.status(200).json({ success: true, data: avgMarks })
}));

router.get('/marks', asyncHandler(async (req, res) => {
    const { gtMarks, ltMarks } = req.query;

    const updateMarks = await prisma.mark.findMany({
        where: {
            OR: [
                {
                    score: {
                        gte: Number(gtMarks),
                    }
                },
                {
                    score: {
                        lte: Number(ltMarks)
                    }
                }
            ]
        },
        orderBy: {
            score: 'asc'
        },
        skip: (Number(req.query.page) || 1 - 1) * 10,
        take: 4
    });

    return res.status(200).json({ success: true, data: updateMarks });
}));

router.get('/marks/:studentId/:examId', asyncHandler(async (req, res) => {
    const { studentId, examId } = req.params;
}))


//create course exam

router.post('/course/exam', asyncHandler(async (req, res) => {
    const { course, exam } = req.body;

    if (!course || !exam) {
        return res.status(400).json({ success: false, message: "Course and Exam are required" });
    };

    const courseExam = await prisma.course.create({
        data: {
            ...course,
            exams: {
                create: exam
            }
        },
        include: {
            exams: true
        }
    });

    return res.status(201).json({ success: true, data: courseExam });
}))






export default router;