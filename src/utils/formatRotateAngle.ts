const availableAngles = [0, 90, 180, 270];

export default function formatRotateAngle(angle: number): number {
    if (availableAngles.includes(angle)) return angle;
    if (angle <= 0 && availableAngles.includes(angle + 360)) return angle + 360;
    if (angle > 360 && availableAngles.includes(angle - 360)) return angle - 360;

    // if angle is not in available angles, return neighbor angle
    for (let i = 0; i < availableAngles.length; i++) {
        const currentAngle = availableAngles[i];
        const nextAngle = availableAngles[i + 1];
        if (angle > currentAngle && angle < nextAngle) return nextAngle;
    }

    return angle < 0 ? 0 : 270;
}

