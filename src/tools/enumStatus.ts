import { AlertColor } from "@mui/material"

const statusEnum = (_originalStatus: string) => {
    const originalStatus = _originalStatus.toLowerCase()

    let status: { color: AlertColor; text: string } = { color: "warning", text: _originalStatus }

    if (originalStatus == "paid") status = { color: "success", text: "Pago" }
    if (originalStatus == "pending") status = { color: "error", text: "Pendente" }

    return status
}

export default statusEnum
