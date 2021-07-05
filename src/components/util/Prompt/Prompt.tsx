import { action, makeObservable, observable } from "mobx"
import { observer } from "mobx-react"
import mobxRemotedev from "mobx-remotedev"
import React, { FC } from "react"
import Button from "../Button/Button.style"

type PromptCallback = () => void

interface ButtonData {
	text: string
	callback?: PromptCallback
}

interface PromptData {
	title: string
	subtitle?: string
	buttons: ButtonData[]
}

@mobxRemotedev({
	name: "Prompt",
})
class PromptStore {
	rendered: boolean = false

	title: string = ""
	subtitle: string = ""
	buttons: ButtonData[] = []
	constructor() {
		makeObservable(this, {
			rendered: observable,
			displayPrompt: action,
			resolvePrompt: action,
			hidePrompt: action,
		})
	}

	displayPrompt = ({ title, subtitle = "", buttons }: PromptData): void => {
		this.title = title
		this.subtitle = subtitle
		this.buttons = buttons
		this.rendered = true
	}
	resolvePrompt = (index: number) => {
		this.buttons[index]?.callback?.()
		this.hidePrompt()
		this.buttons = []
	}

	hidePrompt = () => {
		this.rendered = false
	}
}

const prompt = new PromptStore()

export { prompt }

const Prompt: FC<PromptData> = (data) => {
	prompt.displayPrompt(data)
	return null
}

interface PromptManagerProps {
	className?: string
}

const PromptManagerFunc: FC<PromptManagerProps> = ({ className }) => {
	const resolvePrompt = (index: number) => () => {
		prompt.resolvePrompt(index)
	}

	if (!prompt.rendered) return null
	return (
		<div className={className}>
			<div className="prompt">
				<h2>{prompt.title}</h2>
				<h4>{prompt.subtitle}</h4>
				<div className="buttons">
					{prompt.buttons.map((b, i) => {
						return (
							<Button
								key={`button${i}`}
								className="promptButton"
								color="greyLight"
								onClick={resolvePrompt(i)}
							>
								{b.text}
							</Button>
						)
					})}
				</div>
			</div>
		</div>
	)
}

const PromptManager = observer(PromptManagerFunc)

export default Prompt

export { PromptManager }
