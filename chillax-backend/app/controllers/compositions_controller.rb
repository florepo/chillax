class CompositionsController < ApplicationController
    def index
        compositions  = Composition.all
        render json: compositions, include: [:sounds, :user]
    end
end
