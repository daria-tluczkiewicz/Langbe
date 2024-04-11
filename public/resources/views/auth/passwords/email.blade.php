@extends('layouts.app')

@section('content')
<div class="container">
            <div class="app-card card">
                <h1 class="card-header">{{ __('Reset Password') }}</h1>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        @csrf
                            <input placeholder="Email Address" id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror

                            <button type="submit" class="button">
                                {{ __('Send Password Reset Link') }}
                            </button>
                </form>
                </div>
            </div>
</div>
@endsection
